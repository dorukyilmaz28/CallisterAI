import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("=== API Route Başladı ===");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Vercel URL:", process.env.VERCEL_URL);
    
    const { messages, context } = await req.json();
    console.log("Request data:", { messagesCount: messages?.length, context });
    
    // Son kullanıcı mesajını kontrol et
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && lastUserMessage.role === "user") {
      const charCount = lastUserMessage.content.trim().length;
      if (charCount > 200) {
        return NextResponse.json(
          { 
            error: "Mesajınız çok uzun. Maksimum 200 karakter kullanabilirsiniz.",
            charCount,
            maxChars: 200
          },
          { status: 400 }
        );
      }
    }

    // Context'e göre system prompt
    let systemPrompt = "";
    switch (context) {
      case "strategy":
        systemPrompt = "Sen bir FRC strateji uzmanısın. Robot stratejileri, oyun analizi ve takım koordinasyonu konularında yardım ediyorsun.";
        break;
      case "mechanical":
        systemPrompt = "Sen bir FRC mekanik tasarım uzmanısın. Robot mekaniği, motor seçimi, güç aktarımı ve mekanik tasarım konularında yardım ediyorsun.";
        break;
      case "simulation":
        systemPrompt = "Sen bir FRC simülasyon uzmanısın. Robot simülasyonu, fizik motorları ve test ortamları konularında yardım ediyorsun.";
        break;
      default:
        systemPrompt = "Sen bir FRC uzmanısın. Genel FRC konularında, robot tasarımı, programlama ve yarışma stratejileri hakkında yardım ediyorsun.";
    }

    // Free sürüm için optimize edilmiş mesaj dizisi
    const optimizedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-2) // Son 2 mesaj
    ];

    // API key'i environment variable'dan al
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    console.log("API Key check:", {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      startsWith: apiKey?.substring(0, 10) || "N/A"
    });
    
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY environment variable is not set");
      return NextResponse.json(
        { 
          error: "API key yapılandırılmamış. Lütfen Vercel dashboard'da OPENROUTER_API_KEY environment variable'ını ayarlayın.",
          debug: {
            env: process.env.NODE_ENV,
            vercelUrl: process.env.VERCEL_URL,
            hasApiKey: !!process.env.OPENROUTER_API_KEY
          }
        },
        { status: 500 }
      );
    }
    
    console.log("Messages count:", optimizedMessages.length);

    // OpenRouter API çağrısı
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
        "X-Title": "Callister FRC AI Assistant",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: optimizedMessages,
        max_tokens: 4000, // Çok daha uzun yanıtlar için
        temperature: 0.7,
      }),
    });

    console.log("HTTP Status:", res.status);
    
    // Raw response'u al
    const rawText = await res.text();
    console.log("Raw response length:", rawText.length);

    if (!res.ok) {
      console.error("OpenRouter Error:", rawText);
      let errorMessage = "OpenRouter API hatası";
      
      if (res.status === 401) {
        errorMessage = "API key geçersiz veya süresi dolmuş. Lütfen Vercel dashboard'da OPENROUTER_API_KEY'i kontrol edin.";
      } else if (res.status === 429) {
        errorMessage = "API rate limit aşıldı. Lütfen birkaç dakika bekleyin.";
      } else if (res.status === 402) {
        errorMessage = "API kredisi yetersiz. Lütfen OpenRouter hesabınızı kontrol edin.";
      }
      
      return NextResponse.json(
        { 
          error: errorMessage, 
          status: res.status,
          details: rawText.substring(0, 200) // İlk 200 karakter
        }, 
        { status: 500 }
      );
    }

    // JSON parse et
    let completion;
    try {
      completion = JSON.parse(rawText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json(
        { error: "API yanıtı parse edilemedi", raw: rawText.substring(0, 200) },
        { status: 500 }
      );
    }

    let aiResponse = completion.choices?.[0]?.message?.content || "Üzgünüm, bir yanıt oluşturamadım.";
    
    // AI yanıtındaki istenmeyen token'ları temizle
    aiResponse = aiResponse
      .replace(/REDACTED_SPECIAL_TOKEN/g, '')
      .replace(/REDACTED.*?TOKEN/g, '')
      .replace(/\[REDACTED.*?\]/g, '')
      .replace(/<\| begin_of_sentence \|>/g, '')
      .replace(/<\| end_of_sentence \|>/g, '')
      .replace(/<\|.*?\|>/g, '')
      .trim();

    return NextResponse.json({
      messages: [...messages, { role: "assistant", content: aiResponse }],
      context,
      timestamp: new Date().toISOString(),
      model: "deepseek/deepseek-chat-v3.1:free",
    });

  } catch (error: any) {
    console.error("Route Error:", error);
    return NextResponse.json(
      {
        error: "AI servisine erişilemiyor.",
        details: error.message,
        timestamp: new Date().toISOString(),
        model: "fallback",
      },
      { status: 500 }
    );
  }
}

import axios from 'axios';

const API_KEY = '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'; // استبدل بمفتاح API الخاص بك
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const getChatGPTResponse = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500, // تحديد الحد الأقصى للرموز
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        timeout: 15000, // 15 ثانية كحد أقصى للانتظار
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return 'عذرًا، حدث خطأ في معالجة طلبك. يرجى المحاولة لاحقًا.';
  }
};
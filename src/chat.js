import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef();

  const sendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    setIsLoading(true);

    const userMessage = { id: `${Date.now()}`, text: inputText, sender: 'user' };
    const tempMessage = { id: 'temp', text: 'جاري الكتابة...', sender: 'bot' };

    setMessages(prev => [...prev, userMessage, tempMessage]);
    setInputText('');

    try {
      const chatMessages = [
        ...messages
          .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
          .map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
        { role: 'user', content: inputText }
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: chatMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `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`, // ← بدّل ده بمفتاحك
          },
        }
      );

      const gptReply = response.data.choices[0].message.content;

      setMessages(prev => [
        ...prev.filter((msg) => msg.id !== 'temp'),
        { id: `${Date.now()}-bot`, text: gptReply, sender: 'bot' },
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev.filter((msg) => msg.id !== 'temp'),
        { id: `${Date.now()}-err`, text: 'حصل خطأ أثناء الاتصال بـ ChatGPT.', sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.id === 'temp' && <ActivityIndicator size="small" color="#0000ff" />}
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="اكتب رسالتك هنا..."
          onSubmitEditing={sendMessage}
          editable={!isLoading}
        />
        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  loadingIndicator: {
    marginRight: 10,
  },
});

export default ChatScreen;

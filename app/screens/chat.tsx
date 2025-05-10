import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { getChatGPTResponse } from '../../src/chat'; // استيراد وظيفة API المحسنة

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef();

  const sendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    // إضافة رسالة المستخدم
    const userMessage = { 
      id: Date.now(), 
      text: inputText, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // إضافة رسالة تحميل مؤقتة
      const tempMessage = { 
        id: 'temp', 
        text: 'جاري الكتابة...', 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, tempMessage]);
      
      // استدعاء API لـ ChatGPT مع معالجة الأخطاء
      const response = await getChatGPTResponse(inputText);
      
      // إزالة رسالة التحميل وإضافة الرد الحقيقي
      setMessages(prev => prev.filter(msg => msg.id !== 'temp'));
      const botMessage = { 
        id: Date.now() + 1, 
        text: response, 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== 'temp'));
      const errorMessage = { 
        id: Date.now() + 1, 
        text: 'عذرًا، حدث خطأ في الاتصال. يرجى المحاولة لاحقًا.', 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
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
          <View style={[
            item.sender === 'user' ? styles.userMessage : styles.botMessage,
            styles.messageContainer
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.id === 'temp' && (
              <ActivityIndicator size="small" color="#0000ff" style={styles.loadingInMessage} />
            )}
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={styles.flatListContent}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            isLoading && styles.disabledInput
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="اكتب رسالتك هنا..."
          placeholderTextColor="#999"
          onSubmitEditing={sendMessage}
          editable={!isLoading}
          multiline
        />
        {isLoading ? (
          <ActivityIndicator style={styles.sendIndicator} />
        ) : (
          <Text 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={isLoading}
          >
            إرسال
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    padding: 15,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderBottomRightRadius: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#000', // للرسائل الواردة
  },
  userMessageText: {
    color: '#fff', // للرسائل الصادرة
  },
  timestamp: {
    fontSize: 10,
    color: '#6c757d',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    maxHeight: 100,
  },
  disabledInput: {
    backgroundColor: '#e9ecef',
  },
  sendButton: {
    color: '#007bff',
    fontWeight: 'bold',
    padding: 10,
  },
  sendIndicator: {
    marginRight: 10,
  },
  loadingInMessage: {
    marginTop: 5,
  },
});

export default ChatScreen;
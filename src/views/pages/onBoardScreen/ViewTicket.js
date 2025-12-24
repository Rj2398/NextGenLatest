import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

// Icon imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// 🎯 ADDED: The library for document/image picking
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../config/colors';

// --- Constants ---
const PRIMARY_COLOR = colors.PRIMARY_COLOR;
const BORDER_COLOR = colors.BORDER_COLOR;
const TEXT_GRAY = colors.TEXT_GRAY;
const PLACEHOLDER_GRAY = colors.PLACEHOLDER_GRAY;
const PRIMARY_LIGHT = colors.PRIMARY_LIGHT;

// --- Dummy Data (Kept the same) ---
const TICKET_DETAILS = {
  id: 'TICK-102545',
  status: 'Closed',
  priority: 'High',
  department: 'Sales',
  subject: "Can't see my annual rebate summary",
  dateCreated: 'Jan 15, 2024 | 09:30 AM',
  lastUpdated: '5 hours ago',
  referenceID: '123456-ABC',
};

const CHAT_THREAD = [
  {
    id: 1,
    type: 'user',
    text: 'Hello, I created this ticket because I am unable to view my summary for the annual rebate. It shows an error when I try to open it. Could you please check on this?',
    time: 'Jan 15, 2024, 10:00 AM',
    attachment: null,
    profileInitial: 'M',
  },
  {
    id: 2,
    type: 'system',
    text: 'Your request has been forwarded to the finance team. They will look into the rebate calculation and update you within 24 hours.',
    time: 'Jan 15, 2024, 10:05 AM',
    attachment: null,
    profileInitial: 'S',
  },
  {
    id: 3,
    type: 'admin',
    text: 'Good day! I am John from the support team. I have checked the system and it seems there was a temporary sync issue. The summary should be available now. Please verify. If the issue persists, try clearing your cache.',
    time: 'Jan 15, 2024, 11:45 AM',
    attachment: null,
    profileInitial: 'J',
  },
  {
    id: 4,
    type: 'user',
    text: 'I cleared the cache and tried again, but the problem is still there. I am attaching a screenshot of the error.',
    time: 'Jan 16, 2024, 08:00 AM',
    attachment: {name: 'summary_error_2.pdf', size: '1.2MB'},
    profileInitial: 'M',
  },
  {
    id: 5,
    type: 'admin',
    text: 'Thanks for the screenshot. I have reopened the ticket and escalated it to level 2 support for deeper investigation. They will reach out to you directly with an update.',
    time: 'Jan 16, 2024, 09:15 AM',
    attachment: null,
    profileInitial: 'J',
  },
];

// --- Sub-Components (Kept the same) ---
const ChatBubble = ({message}) => {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <View style={styles.systemMessageContainer}>
        <Text style={styles.systemMessageText}>{message.text}</Text>
      </View>
    );
  }

  const bubbleStyle = isUser ? styles.userBubble : styles.adminBubble;
  const textStyle = isUser ? styles.userText : styles.adminText;
  const wrapperStyle = isUser ? styles.userWrapper : styles.adminWrapper;

  return (
    <View style={wrapperStyle}>
      <View
        style={[
          styles.profileIconContainer,
          isUser ? {backgroundColor: PRIMARY_COLOR} : {backgroundColor: '#333'},
        ]}>
        <Text style={styles.profileIconText}>{message.profileInitial}</Text>
      </View>

      <View style={styles.bubbleContent}>
        <Text style={[styles.senderName, isUser && {textAlign: 'right'}]}>
          {isUser ? 'You' : 'Support Agent'}
        </Text>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{message.text}</Text>

          {message.attachment && (
            <TouchableOpacity
              style={[
                styles.attachmentLink,
                isUser && {borderTopColor: '#fff5'},
              ]}>
              <Feather
                name="paperclip"
                size={14}
                color={isUser ? 'white' : PRIMARY_COLOR}
              />
              <Text
                style={[
                  styles.attachmentText,
                  {color: isUser ? 'white' : PRIMARY_COLOR},
                ]}>
                {message.attachment.name}
              </Text>
              <MaterialCommunityIcons
                name="download-circle"
                size={16}
                color={isUser ? 'white' : PRIMARY_COLOR}
              />
            </TouchableOpacity>
          )}

          <Text style={isUser ? styles.userTime : styles.adminTime}>
            {message.time.split(' | ')[0]}
          </Text>
        </View>
      </View>
    </View>
  );
};

// --- Main Screen Component ---
const ViewTicket = () => {
  const navigation = useNavigation();
  const [replyText, setReplyText] = useState('');
  // 🎯 ADDED: State for attachments to be sent with the CURRENT reply
  const [currentReplyAttachments, setCurrentReplyAttachments] = useState([]);

  // --- New File Picker Logic ---
  const handleAttachFile = async () => {
    try {
      // Use openPicker with 'any' to select files (including documents, images, video)
      const files = await ImagePicker.openPicker({
        multiple: false, // Assuming only one attachment per chat message
        mediaType: 'any',
      });

      // Files is an object for single selection
      const file = Array.isArray(files) ? files[0] : files;

      const newAttachment = {
        uri: file.path,
        name: file.filename || file.path.split('/').pop(), // Use filename or derive from path
        size: file.size,
        type: file.mime,
      };

      // Replace or set the file to the current reply attachments state (single file)
      setCurrentReplyAttachments([newAttachment]);
    } catch (err) {
      if (err.message && err.message.includes('User cancelled')) {
        console.log('User cancelled image/file selection.');
      } else {
        console.error('File Picker Error:', err);
      }
    }
  };

  const handleRemoveAttachment = uri => {
    setCurrentReplyAttachments(prev => prev.filter(file => file.uri !== uri));
  };

  const handleSendMessage = () => {
    if (replyText.trim().length > 0 || currentReplyAttachments.length > 0) {
      console.log(
        'Sending message:',
        replyText,
        'Attachments:',
        currentReplyAttachments,
      );

      // In a real app, you'd send this data to your API/backend.

      // Reset state after sending
      setReplyText('');
      setCurrentReplyAttachments([]);
    }
  };

  return (
    <View style={styles.fullContainer}>
      {/* --- Fixed Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <AntDesign name="left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ticket ID: {TICKET_DETAILS.id}</Text>
        <TouchableOpacity style={styles.optionsButton}>
          <Feather name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- Ticket Status Summary --- */}
        <View style={styles.summaryBox}>
          <View style={styles.statusRow}>
            <Text style={styles.summaryTitle}>{TICKET_DETAILS.subject}</Text>
            <View
              style={[
                styles.statusTag,
                TICKET_DETAILS.status === 'Closed'
                  ? styles.statusClosed
                  : styles.statusOpen,
              ]}>
              <Text style={styles.statusText}>
                {TICKET_DETAILS.status.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.tagRow}>
            <View style={[styles.tag, {backgroundColor: 'white'}]}>
              <Text style={styles.tagText}>
                Priority: {TICKET_DETAILS.priority}
              </Text>
            </View>
            <View style={[styles.tag, {backgroundColor: 'white'}]}>
              <Text style={styles.tagText}>
                Dept: {TICKET_DETAILS.department}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Created: {TICKET_DETAILS.dateCreated.split(' | ')[0]}
            </Text>
            <Text style={styles.infoText}>
              Ref ID: {TICKET_DETAILS.referenceID}
            </Text>
          </View>
        </View>

        {/* --- Chat Thread --- */}
        <View style={styles.chatThread}>
          {CHAT_THREAD.map(msg => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </View>

        {/* --- Featured Actions --- */}
        <View style={styles.featuredActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="x-circle" size={18} color="#000" />
            <Text style={styles.actionText}>Close Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="reload1" size={18} color="#000" />
            <Text style={styles.actionText}>Request Reopen</Text>
          </TouchableOpacity>
        </View>

        {/* --- Future Articles (Placeholder) --- */}
        <View style={styles.futureArticles}>
          <Text style={styles.futureArticlesHeader}>Future Articles</Text>
          <TouchableOpacity style={styles.futureArticleButton}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={18}
              color={PRIMARY_COLOR}
            />
            <Text style={styles.futureArticleText}>Check Our FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.futureArticleButton}>
            <Feather name="shuffle" size={18} color={PRIMARY_COLOR} />
            <Text style={styles.futureArticleText}>Request Transfer</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 20}} />
      </ScrollView>

      {/* --- ADDED: Display Current Attachments for Reply --- */}
      {currentReplyAttachments.length > 0 && (
        <View style={styles.replyAttachmentPreview}>
          {currentReplyAttachments.map(file => (
            <View key={file.uri} style={styles.replyAttachmentTag}>
              <MaterialCommunityIcons
                name={
                  file.name.toLowerCase().endsWith('.pdf')
                    ? 'file-pdf-box'
                    : 'file-image'
                }
                size={16}
                color={PRIMARY_COLOR}
              />
              <Text style={styles.replyAttachmentTagText} numberOfLines={1}>
                {file.name}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveAttachment(file.uri)}>
                <AntDesign name="close" size={14} color={TEXT_GRAY} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* --- Fixed Reply Input (Picker is attached here) --- */}
      <View style={styles.replyInputContainer}>
        <TouchableOpacity
          style={styles.replyAttachmentButton}
          onPress={handleAttachFile} // 🎯 ATTACHMENT PICKER IS HERE
        >
          <Feather name="paperclip" size={24} color={TEXT_GRAY} />
        </TouchableOpacity>
        <TextInput
          style={styles.replyInput}
          placeholder="Type your notification..."
          placeholderTextColor={PLACEHOLDER_GRAY}
          value={replyText}
          onChangeText={setReplyText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (replyText.trim().length > 0 ||
              currentReplyAttachments.length > 0) &&
              styles.sendButtonActive, // Check for text OR attachment
          ]}
          onPress={handleSendMessage}
          disabled={
            replyText.trim().length === 0 &&
            currentReplyAttachments.length === 0
          }>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewTicket;

// --- Stylesheet (Added new styles for reply attachment preview) ---
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  optionsButton: {
    padding: 5,
  },
  // --- Summary Box ---
  summaryBox: {
    backgroundColor: PRIMARY_LIGHT,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY_COLOR,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flexShrink: 1,
    marginRight: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 15,
  },
  statusClosed: {
    backgroundColor: '#F44336', // Red
  },
  statusOpen: {
    backgroundColor: '#4CAF50', // Green
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: 'white',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_GRAY,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  infoText: {
    fontSize: 13,
    color: TEXT_GRAY,
    fontWeight: '500',
  },
  // --- Chat Thread Styles ---
  chatThread: {
    marginBottom: 20,
  },
  userWrapper: {
    flexDirection: 'row-reverse',
    marginBottom: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  adminWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  profileIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bubbleContent: {
    maxWidth: '75%',
  },
  senderName: {
    fontSize: 12,
    color: TEXT_GRAY,
    marginBottom: 4,
  },
  // User Bubble (Orange)
  userBubble: {
    backgroundColor: PRIMARY_COLOR,
    padding: 12,
    borderRadius: 15,
    borderTopRightRadius: 2,
  },
  userText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
  userTime: {
    fontSize: 10,
    color: '#fff9',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  // Admin Bubble (White/Gray)
  adminBubble: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    borderTopLeftRadius: 2,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  adminText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  adminTime: {
    fontSize: 10,
    color: TEXT_GRAY,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  // System/Timeline Message (Orange Bar)
  systemMessageContainer: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  systemMessageText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Attachment Link in Bubble
  attachmentLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    paddingTop: 5,
    borderTopColor: BORDER_COLOR,
  },
  attachmentText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
    marginRight: 5,
  },
  // --- Featured Actions ---
  featuredActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  // --- Future Articles ---
  futureArticles: {
    marginVertical: 10,
  },
  futureArticlesHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  futureArticleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginBottom: 8,
  },
  futureArticleText: {
    marginLeft: 10,
    fontSize: 15,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  // --- Reply Input Container ---
  replyAttachmentPreview: {
    // New style for the file preview above input
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 5,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  replyAttachmentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_LIGHT,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  replyAttachmentTagText: {
    fontSize: 13,
    color: PRIMARY_COLOR,
    marginLeft: 5,
    marginRight: 5,
    maxWidth: 100,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  replyAttachmentButton: {
    padding: 10,
    marginBottom: 5,
  },
  replyInput: {
    flex: 1,
    maxHeight: 100, // Limit height for multiline input
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: TEXT_GRAY, // Default inactive color
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  sendButtonActive: {
    backgroundColor: PRIMARY_COLOR, // Active color
  },
});

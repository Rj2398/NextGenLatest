import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal ,
  Image
} from 'react-native';

const SubscriptionDialog = ({ 
  isVisible, 
  onConfirm, 
  onKeepPlan,
  onRequestClose // Required for Android back button/accessibility
}) => {
  return (
    <Modal
      animationType="fade" // A smooth fade animation
      transparent={true} // Allows the background color to show through
      visible={isVisible} // Controls the modal visibility via prop
      onRequestClose={onRequestClose} // Handles the Android back button press
    >
      {/* Semi-transparent background overlay */}
      <View style={styles.viewWrapper}>
        
        {/* The Dialog Content Box */}
        <View style={styles.modalView}>
          
          {/* Warning Icon */}
           <Image source={require('../../assets/images/ic_danger_zone.png')} style={{height:17,width:20}}></Image>
          
         
          <Text style={styles.title}>Cancel Subscription Plan?</Text>
          
          {/* Message */}
          <Text style={styles.message}>
            Are you sure you want to cancel your Premium Monthly Plan? You'll lose your current access at the end of your billing cycle.
          </Text>
          
          <Text style={styles.messageSmall}>
            You can resubscribe anytime from your Billing settings.
          </Text>
          
       <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm Cancellation</Text>
          </TouchableOpacity>
          
          {/* Keep My Plan Button (Outlined/Secondary) */}
          <TouchableOpacity 
            style={[styles.button, styles.keepPlanButton]} 
            onPress={onKeepPlan}
          >
            <Text style={styles.keepPlanButtonText}>Keep My Plan</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  // Full-screen wrapper for the modal with the transparent dark background
  viewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
  },
  
  // The white box containing the dialog content
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  
  // Warning Icon styling
  warningIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  
  // Title text
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    marginTop:10
  },
  
  // Body message text
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  
  messageSmall: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    color: '#999',
  },

  // General button style
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Confirm Cancellation Button (Red)
  confirmButton: {
    backgroundColor: '#DC3545', // Strong Red
  },
  
  // Text style for the Confirm button
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  
  // Keep My Plan Button (Outlined/Secondary)
  keepPlanButton: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#FFC107', // Orange/Amber
  },
  
  // Text style for the Keep Plan button
  keepPlanButtonText: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SubscriptionDialog;
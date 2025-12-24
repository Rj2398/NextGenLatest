// Function to show success toast
export const showSuccessToast = (toast, message) => {
  toast.show(message, {
    type: 'success',
    backgroundColor: '#4BB543',
    textColor: 'white',
    duration: 2000,
  });
};

// Function to show error toast
export const showErrorToast = (toast, message) => {
  toast.show(message, {
    type: 'error',
    backgroundColor: 'red',
    textColor: 'white',
    duration: 2000,
  });
};

// Function to show warning toast
export const showWarningToast = (toast, message) => {
  toast.show(message, {
    type: 'warning',
    backgroundColor: 'yellow',
    textColor: 'black',
    duration: 2000,
  });
};

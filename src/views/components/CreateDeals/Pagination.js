import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";


const Pagination = ({ totalPages = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage); // API CALL TRIGGER
    }
  };

  const goBack = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage); // API CALL TRIGGER
    }
  };

  return (
    <View style={styles.paginationContainer}>
      
      {/* BACK BUTTON */}
      <TouchableOpacity
        style={currentPage === 1 ? styles.arrowBtnDisabled : styles.arrowBtn}
        disabled={currentPage === 1}
        onPress={goBack}
      >
        <Feather
          name="chevron-left"
          size={22}
          color={currentPage === 1 ? "#BFBFBF" : "#ED8A00"}
        />
      </TouchableOpacity>

      <Text style={styles.pageText}>
        Page {currentPage} Of {totalPages}
      </Text>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={currentPage === totalPages ? styles.arrowBtnDisabled : styles.arrowBtn}
        disabled={currentPage === totalPages}
        onPress={goNext}
      >
        <Feather
          name="chevron-right"
          size={22}
          color={currentPage === totalPages ? "#BFBFBF" : "#ED8A00"}
        />
      </TouchableOpacity>

    </View>
  );
};
export default Pagination;
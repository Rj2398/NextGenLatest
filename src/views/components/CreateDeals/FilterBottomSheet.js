import React,{useState} from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FilterForm from "../Filtter/FilterForm";

const FilterBottomSheet = ({ visible, onClose, schema, onApply }) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouch} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Your full dynamic Form */}
          <FilterForm schema={schema}
            onApply={(formValues) => {
              onApply(formValues);
              onClose();          
            }}
               />
        </View>
      </View>
    </Modal>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  overlayTouch: {
    flex: 1,
  },
  sheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: "75%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  close: {
    fontSize: 20,
    color: "#333",
  },
});

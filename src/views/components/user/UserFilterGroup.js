// FilterModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import UserFilterOption from "./UserFilterOption";

const ALL_FILTERS = [
  { value: "Grade RR", label: "Grade RR", icon: null },
  { value: "Grade 1", label: "Grade 1", icon: null },
  { value: "Grade 10", label: "Grade 10", icon: null },
  { value: "Grade 11", label: "Grade 11", icon: null },
  { value: "Grade 12", label: "Grade 12", icon: null },
  { value: "Grade 9", label: "Grade 9", icon: null },
];

const UserFilterGroup = ({
  isVisible,
  onClose,
  showImagesFilter = true,
  onApply,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("contacts");

  const handleApply = () => {
    onApply(selectedFilter);
    onClose();
  };

  const visibleFilters = ALL_FILTERS.filter(
    (filter) => showImagesFilter || filter.value !== "images"
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Filter by Groups</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Image
                source={require("../../../assets/images/ic_cross_icon.png")}
              ></Image>
            </Pressable>
          </View>
          <View style={styles.topHeader}>
            <Text
              style={{ color: "#FF7A00", fontSize: 12, fontWeight: "bold" }}
            >
              Want to join or leave a group?
            </Text>
            <Text
              style={{ color: "#212121", fontSize: 14, fontWeight: "bold" }}
            >
              Abbotsford Christian School
            </Text>
          </View>

          <ScrollView style={styles.optionsList}>
            {visibleFilters.map((filter) => (
              <UserFilterOption
                key={filter.value}
                label={filter.label}
                icon={filter.icon}
                value={filter.value}
                selectedValue={selectedFilter}
                onSelect={setSelectedFilter}
              />
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              style={[styles.button, styles.applyButton]}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  topHeader: {
    flexDirection: "column",
    gap: 8,
    padding: 20,
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    fontSize: 24,
    color: "#aaa",
  },
  optionsList: {
    maxHeight: 300,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  applyButton: {
    backgroundColor: "#FFA500",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserFilterGroup;

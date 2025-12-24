// FilterForm.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
//import { Picker } from "@react-native-picker/picker";

const FilterForm = ({ schema, onApply }) => {
  const [form, setForm] = useState({});

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (field) => {
    if (!field.isVisible) return null;

    switch (field.fieldType) {
      case "SearchText":
        return (
          <View style={{ marginVertical: 10 }}>
            <Text>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={(txt) => handleChange(field.fieldName, txt)}
            />
          </View>
        );

      case "Select":
        return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>
        {field.label}
      </Text>

      {(field.options || []).map((op) => {
        const isSelected = form[field.fieldName] === op.value;

        return (
          <TouchableOpacity
            key={op.value}
            onPress={() => handleChange(field.fieldName, op.value)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            {/* Radio Outer Circle */}
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: "#ED8A00",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              {/* Inner Dot */}
              {isSelected && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#ED8A00",
                  }}
                />
              )}
            </View>

            {/* Label Text */}
            <Text style={{ fontSize: 16 }}>{op.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

      case "Checkbox":
        return (
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
            <Switch
              value={form[field.fieldName] ?? false}
              onValueChange={(val) => handleChange(field.fieldName, val)}
            />
            <Text style={{ marginLeft: 10 }}>{field.label}</Text>
          </View>
        );

      case "Date":
        return (
          <View style={{ marginVertical: 10 }}>
            <Text>{field.label}</Text>
            <TouchableOpacity
              style={{ padding: 12, backgroundColor: "#eee", borderRadius: 8 }}
              onPress={() => handleChange(field.fieldName, new Date())}
            >
              <Text>
                {form[field.fieldName]
                  ? form[field.fieldName].toDateString()
                  : field.placeholder}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case "Button":
        return (
          <TouchableOpacity
            style={{
              backgroundColor: "#ED8A00",
              padding: 12,
              marginVertical: 10,
              borderRadius: 8,
            }}
             onPress={() => {
          console.log("📌 FilterForm FINAL:", form);
          onApply(form);
        }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
              {field.label}
            </Text>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {schema.fields.map((field) => (
        <View key={field.id}>{renderField(field)}</View>
      ))}
    </View>
  );
};

export default FilterForm;

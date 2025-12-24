// utils/formatDisplayFields.js
// export const formatDisplayFields = (item, fieldLabelMap = {}, options = {}) => {
//   if (!item || typeof item !== 'object') return [];

//   const {
//     exclude = ['product_image', 'order_date', 'payment_method', 'total_amount'],
//     formatters = {}, // optional: field-specific formatters
//   } = options;

//   const result = [];

//   for (const key in item) {
//     if (!item.hasOwnProperty(key)) continue;
//     if (exclude.includes(key)) continue;

//     const value = item[key];
//     const label = fieldLabelMap[key];

//     if (value === null || value === undefined || value === '' || !label)
//       continue;

//     const formattedValue =
//       typeof formatters[key] === 'function'
//         ? formatters[key](value, item)
//         : value;

//     result.push({label, value: formattedValue});
//   }

//   return result;
// };

export const formatDisplayFields = (item, fieldLabelMap = {}, options = {}) => {
  if (!item || typeof item !== 'object') return [];

  const {exclude = [], formatters = {}} = options; // empty exclude

  const result = [];

  for (const key in item) {
    if (!item.hasOwnProperty(key)) continue;
    if (exclude.includes(key)) continue;

    const value = item[key];
    const label = fieldLabelMap[key];

    if (value === null || value === undefined || value === '' || !label)
      continue;

    const formattedValue =
      typeof formatters[key] === 'function'
        ? formatters[key](value, item)
        : value;

    result.push({label, value: formattedValue});
  }

  return result;
};

/**
 * Extracts a map of fieldName => localized label from an API schema.
 *
 * Example:
 * schema.pages[0].sections[0].fields[] → { product_name: "Product Name", quantity: "Quantity" }
 */
//10-12-25
export const extractFieldLabelMap = schema => {
  const map = {};
  if (!schema || typeof schema !== 'object') return map;
  const pages = schema.pages || [];

  pages.forEach(page => {
    (page.sections || []).forEach(section => {
      (section.fields || []).forEach(field => {
        //   console.log(field,"MEP LOG******");
        const key = field.fieldName;
        const label =
          field.localization?.localizedText ||
          field.label ||
          field.placeholder ||
          key;
        if (key) map[key] = label;
      });
    });
  });

  return map;
};
export const extractFieldLabelMapForPage = page => {
  const map = {};

  if (!page || typeof page !== 'object') return map;

  const sections = page.sections || [];

  sections.forEach(section => {
    (section.fields || []).forEach(field => {
      const key = field.fieldName;

      const label =
        field.localization?.localizedText ||
        field.label ||
        field.placeholder ||
        key;

      const placeholder = field.placeholder || '';

      if (key) {
        map[key] = label;
        map[`${key}_placeholder`] = placeholder;
      }
    });
  });

  return map;
};

export const extractFieldLabels = schema => {
  const result = {};

  // Validate schema
  if (!schema || !Array.isArray(schema.pages)) {
    return result;
  }

  // Add schema title
  if (schema.title) {
    result['schema_title'] = schema.title;
  }

  // Loop through all pages
  schema.pages.forEach(page => {
    if (!Array.isArray(page.sections)) return;

    // Loop through all sections
    page.sections.forEach(section => {
      if (!Array.isArray(section.fields)) return;

      // Loop through fields
      section.fields.forEach(field => {
        if (field.fieldName && field.label) {
          result[field.fieldName] = field.label;
        }
      });
    });
  });

  return result;
};

/**
 * Extract labels from a schema that contains only "sections → fields"
 */
export const extractSectionFieldLabels = schema => {
  const result = {};

  // Validate input
  if (!schema || typeof schema !== 'object') return result;

  // Add schema title if present
  if (schema.title) {
    result['schema_title'] = schema.title;
  }

  // Check if sections exist
  if (!Array.isArray(schema.sections)) return result;

  // Loop through sections → fields
  schema.sections.forEach(section => {
    if (!Array.isArray(section.fields)) return;

    section.fields.forEach(field => {
      if (field.fieldName && field.label) {
        result[field.fieldName] = field.label;
      }
    });
  });

  return result;
};

export const generateSectionWiseObject = (schema, items) => {
  if (!schema || !schema.sections) {
    console.log('❌ Invalid Schema:', schema);
    return {};
  }

  const finalObj = {};

  schema.sections.forEach(section => {
    const sectionName = section.name;

    finalObj[sectionName] = {
      title: section.title, // ⭐ Add section title
      fields: {}, // ⭐ all fields will be inside this
    };

    section.fields.forEach(field => {
      const baseField = {
        label: field.label,
        placeholder: field.placeholder,
        value: items?.[field.fieldName] ?? '',
        isRequired: field.isRequired, // ⭐ ADDED REQUIRED FLAG FOR VALIDATION
        fieldType: field.fieldType, // ⭐ helpful for validation & UI
      };

      // ⭐ Add dropdown options if Select type
      if (field.fieldType === 'Select') {
        baseField.options = field.options || [];
      }

      finalObj[sectionName].fields[field.fieldName] = baseField;
    });
  });

  return finalObj;
};

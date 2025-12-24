import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// --- Definición de colores solo para este archivo ---
const color = {
  white: '#FFFFFF',
  orangePrimary: '#FF8719', // Primary orange color
  borderLight: '#E0E0E0',
  black: '#000000',
};

/**
 * Componente de Botón Principal para acciones primarias.
 * Tiene un estilo fijo y sombreado para destacar.
 * * @param {string} title - El texto del botón.
 * @param {function} onPress - La función a ejecutar al presionar.
 * @param {object} style - Estilos adicionales opcionales para el contenedor del botón.
 */
const PrimaryButton = ({ title, onPress, style = {} }) => {
  return (
    <TouchableOpacity 
      style={[styles.nextStepButton, style]} 
      onPress={onPress}
    >
      <Text style={styles.nextStepButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextStepButton: {
    backgroundColor: color.orangePrimary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra para Android (elevation) y iOS (shadow properties)
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  nextStepButtonText: {
    color: color.white,
    fontSize: 17,
    fontWeight: '700',
  },
});

export default PrimaryButton;
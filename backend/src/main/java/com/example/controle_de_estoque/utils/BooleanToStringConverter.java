package com.example.controle_de_estoque.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class BooleanToStringConverter implements AttributeConverter<Boolean, String> {

    @Override
    public String convertToDatabaseColumn(Boolean attribute) {
        // Convert boolean to 'S' (true) or 'N' (false)
        return (attribute != null && attribute) ? "S" : "N";
    }

    @Override
    public Boolean convertToEntityAttribute(String dbData) {
        // Convert 'S' to true and 'N' to false
        return "S".equalsIgnoreCase(dbData);
    }
}

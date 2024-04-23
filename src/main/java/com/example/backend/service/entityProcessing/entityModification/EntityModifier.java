package com.example.backend.service.entityProcessing.entityModification;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;

@Log4j2
@Service
public class EntityModifier {
//    public <T> T modifyEntity(T entity, T newData) {
//        Field[] entityFields = entity.getClass().getDeclaredFields();
//        Field[] dtoFields = newData.getClass().getDeclaredFields();
//
//        for (Field field : dtoFields) {
//            try {
//                if (entityFields.)
//                field.setAccessible(true);
//                Object value = field.get(newData);
//                if (value != null) {
//                    field.set(entity, value);
//                }
//            } catch (IllegalAccessException e) {
//                e.printStackTrace();
//            }
//        }
//
//        return entity;
//    }
}

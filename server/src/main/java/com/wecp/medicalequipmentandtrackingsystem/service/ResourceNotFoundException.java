package com.wecp.medicalequipmentandtrackingsystem.service;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super("Requested resource was not found.");
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
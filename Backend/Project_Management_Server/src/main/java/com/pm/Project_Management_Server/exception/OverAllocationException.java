package com.pm.Project_Management_Server.exception;

public class OverAllocationException extends RuntimeException {
    public OverAllocationException(String message) {
        super(message);
    }
    public OverAllocationException(String message, Throwable cause) {
        super(message, cause);
    }
} 
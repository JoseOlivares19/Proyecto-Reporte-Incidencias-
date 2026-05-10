package com.unireport.service;

public interface MailService {
    void enviarCorreo(String destinatario, String asunto, String mensaje);
}
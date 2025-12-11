package com.autotrade.entity.system;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "system_error_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(SystemErrorLogId.class)
@EntityListeners(AuditingEntityListener.class)
public class SystemErrorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "system_error_log_seq")
    @SequenceGenerator(name = "system_error_log_seq", sequenceName = "system_error_log_seq", allocationSize = 1)
    @Column(name = "log_id")
    private Long logId;

    @Id
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false, insertable = true)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "error_level", nullable = false)
    private String errorLevel;

    @Column(name = "error_code")
    private String errorCode;

    @Column(name = "error_message", columnDefinition = "TEXT", nullable = false)
    private String errorMessage;

    @Column(name = "stack_trace", columnDefinition = "TEXT")
    private String stackTrace;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name = "request_id")
    private String requestId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "metadata", columnDefinition = "JSONB")
    private String metadata;
}


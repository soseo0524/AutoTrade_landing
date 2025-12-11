package com.autotrade.entity.system;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.ErrorSource;
import com.autotrade.entity.enums.RefType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "error")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Error extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "error_id")
    private Long errorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false)
    private ErrorSource source;

    @Enumerated(EnumType.STRING)
    @Column(name = "ref_type", nullable = false)
    @Builder.Default
    private RefType refType = RefType.none;

    @Column(name = "ref_id")
    private Long refId;

    @Column(name = "message", nullable = false, length = 1000)
    private String message;

    @Column(name = "payload_json", columnDefinition = "JSON")
    @JdbcTypeCode(SqlTypes.JSON)
    private String payloadJson;

    @Column(name = "occurred_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime occurredAt = LocalDateTime.now();

    @Column(name = "resolved")
    @Builder.Default
    private Boolean resolved = false;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
}


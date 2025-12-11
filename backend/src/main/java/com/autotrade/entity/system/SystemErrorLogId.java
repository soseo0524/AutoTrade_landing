package com.autotrade.entity.system;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class SystemErrorLogId implements Serializable {

    private Long logId;
    private LocalDateTime createdAt;
}


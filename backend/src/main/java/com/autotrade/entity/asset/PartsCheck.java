package com.autotrade.entity.asset;

import com.autotrade.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parts_check")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartsCheck extends BaseEntity {

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false)
    @MapsId
    private Part part;
}


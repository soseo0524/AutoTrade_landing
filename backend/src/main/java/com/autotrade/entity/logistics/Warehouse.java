package com.autotrade.entity.logistics;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.WarehouseCapability;
import com.autotrade.entity.enums.WarehouseCategory;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "warehouse")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Warehouse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "warehouse_code", nullable = false, unique = true, length = 50)
    private String warehouseCode;

    @Column(name = "state_code", nullable = false, length = 2)
    private String stateCode;

    @Column(name = "county_code", nullable = false, length = 10)
    private String countyCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private WarehouseCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "capability", nullable = false)
    private WarehouseCapability capability;

    @Column(name = "default_outbound_sub_id")
    private Long defaultOutboundSubId;

    @Column(name = "seq", nullable = false)
    private Integer seq;
}


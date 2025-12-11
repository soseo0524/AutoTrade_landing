package com.autotrade.entity.logistics;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.TransferStatusERD;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "warehouse_transfer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarehouseTransfer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private Long transferId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false)
    private com.autotrade.entity.asset.Part part;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_warehouse_id", nullable = false)
    private Warehouse fromWarehouse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_warehouse_id", nullable = false)
    private Warehouse toWarehouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private TransferStatusERD status = TransferStatusERD.Planned;

    @Column(name = "requested_at", nullable = false, updatable = false)
    @Builder.Default
    private java.time.LocalDateTime requestedAt = java.time.LocalDateTime.now();

    @Column(name = "received_at")
    private java.time.LocalDateTime receivedAt;
}


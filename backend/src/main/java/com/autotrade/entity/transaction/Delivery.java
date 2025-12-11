package com.autotrade.entity.transaction;

import com.autotrade.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "delivery")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long deliveryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false)
    private com.autotrade.entity.asset.Part part;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private com.autotrade.entity.logistics.Warehouse warehouse;

    @Column(name = "carrier", length = 100)
    private String carrier;

    @Column(name = "tracking_no", length = 100)
    private String trackingNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private DeliveryStatus status = DeliveryStatus.Packed;

    @Column(name = "shipped_at")
    private java.time.LocalDateTime shippedAt;

    @Column(name = "delivered_at")
    private java.time.LocalDateTime deliveredAt;

    public enum DeliveryStatus {
        Packed,
        Shipped,
        Delivered,
        Returned,
        Cancelled
    }
}

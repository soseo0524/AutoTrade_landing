package com.autotrade.entity.transaction;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.asset.Part;
import com.autotrade.entity.enums.SalesChannel;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "sale", uniqueConstraints = {
        @UniqueConstraint(columnNames = "part_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long saleId;

    @Column(name = "price", nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "sales_channel", nullable = false)
    private SalesChannel salesChannel;

    @Column(name = "sold_at", nullable = false)
    private java.time.LocalDateTime soldAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false, unique = true)
    private Part part;
}

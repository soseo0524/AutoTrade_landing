package com.autotrade.entity.partner;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.ShopType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "shop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "partner_id", nullable = false)
    private Long partnerId; // References individual or ambassador

    @Enumerated(EnumType.STRING)
    @Column(name = "shop_type", nullable = false)
    private ShopType shopType;

    @Column(name = "charter_end_date")
    private LocalDate charterEndDate;
}


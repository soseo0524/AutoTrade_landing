package com.autotrade.entity.partner;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.PartnerType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "seller_reputation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Check(constraints = "(owner_partner_type = 'individual' AND owner_partner_id IS NOT NULL) OR " +
                     "(owner_partner_type = 'shop' AND owner_partner_id IS NOT NULL) OR " +
                     "(owner_partner_type = 'ambassador' AND owner_partner_id IS NOT NULL)")
public class SellerReputation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rep_id")
    private Long repId;

    @Enumerated(EnumType.STRING)
    @Column(name = "owner_partner_type", nullable = false)
    private PartnerType ownerPartnerType;

    @Column(name = "owner_partner_id", nullable = false)
    private Long ownerPartnerId;

    @Column(name = "score", nullable = false, precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal score = BigDecimal.ZERO;

    @Column(name = "rating_count", nullable = false)
    @Builder.Default
    private Integer ratingCount = 0;

    @Column(name = "last_calculated_at")
    private LocalDateTime lastCalculatedAt;

    @Column(name = "notes", length = 500)
    private String notes;
}


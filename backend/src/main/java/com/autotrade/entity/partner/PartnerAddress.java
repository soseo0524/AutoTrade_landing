package com.autotrade.entity.partner;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.AddressType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;

@Entity
@Table(name = "partner_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Check(constraints = "(shop_id IS NOT NULL AND individual_id IS NULL AND ambassador_id IS NULL) OR " +
                     "(shop_id IS NULL AND individual_id IS NOT NULL AND ambassador_id IS NULL) OR " +
                     "(shop_id IS NULL AND individual_id IS NULL AND ambassador_id IS NOT NULL)")
public class PartnerAddress extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "partner_address_id")
    private Long partnerAddressId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private AddressType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "individual_id")
    private Individual individual;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ambassador_id")
    private Ambassador ambassador;
}


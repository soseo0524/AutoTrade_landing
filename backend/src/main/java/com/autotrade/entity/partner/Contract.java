package com.autotrade.entity.partner;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.ContractTypeERD;
import com.autotrade.entity.enums.PartnerType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "document_id", nullable = false, length = 100)
    private String documentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "partner_type", nullable = false)
    private PartnerType partnerType; // XOR: individual, shop, or ambassador

    @Column(name = "partner_id", nullable = false)
    private Long partnerId; // References individual, shop, or ambassador based on partner_type

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type", nullable = false)
    private ContractTypeERD contractType;

    @Column(name = "date_signed_utc", nullable = false)
    private LocalDateTime dateSignedUtc;
}


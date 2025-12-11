package com.autotrade.entity.asset;

import com.autotrade.common.BaseEntity;
import com.autotrade.entity.enums.IntakeClass;
import com.autotrade.entity.enums.PartStatusERD;
import com.autotrade.entity.enums.PartnerType;
import com.autotrade.entity.logistics.Warehouse;
import io.hypersistence.utils.hibernate.type.vector.VectorType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.List;

@Entity
@Table(name = "parts", indexes = {
    @Index(name = "idx_part_owner_partner_type", columnList = "owner_partner_type"),
    @Index(name = "idx_part_owner_partner_id", columnList = "owner_partner_id"),
    @Index(name = "idx_part_status", columnList = "status"),
    @Index(name = "idx_part_current_warehouse_id", columnList = "current_warehouse_id"),
    @Index(name = "idx_part_description_vector", columnList = "description_vector", unique = false)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Part extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "part_id")
    private Long partId;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Type(VectorType.class)
    @Column(name = "description_vector", columnDefinition = "vector(1536)")
    private List<Double> descriptionVector;

    @Enumerated(EnumType.STRING)
    @Column(name = "owner_partner_type", nullable = false)
    private PartnerType ownerPartnerType;

    @Column(name = "owner_partner_id", nullable = false)
    private Long ownerPartnerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_warehouse_id")
    private Warehouse currentWarehouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private PartStatusERD status = PartStatusERD.Awaiting_Receipt;

    @Column(name = "internal_record_url", length = 1024)
    private String internalRecordUrl;

    @Column(name = "qr_label_png_path", length = 512)
    private String qrLabelPngPath;

    @Enumerated(EnumType.STRING)
    @Column(name = "intake_class")
    private IntakeClass intakeClass;

    @Column(name = "transfer_needed")
    @Builder.Default
    private Boolean transferNeeded = false;
}


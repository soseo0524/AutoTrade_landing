package com.autotrade.entity.asset;

import com.autotrade.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "media_asset")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaAsset extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "media_asset_id")
    private Long mediaAssetId;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "media_type", nullable = false)
    private String mediaType; // e.g., "image/jpeg", "video/mp4"

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "display_order")
    private Integer displayOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false)
    @OnDelete(action = org.hibernate.annotations.OnDeleteAction.CASCADE)
    private Part part;
}


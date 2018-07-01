export const BulletType = {
  TONIC: 0,
  THIRD: 2,
  FIFTH: 4,
  SEVENTH: 6
}

export function getOffsetFromBulletType (bulletType) {
  switch (bulletType) {
    case BulletType.TONIC:
      return 1 / (Object.keys(BulletType).length + 1)
    case BulletType.THIRD:
      return 2 / (Object.keys(BulletType).length + 1)
    case BulletType.FIFTH:
      return 3 / (Object.keys(BulletType).length + 1)
    case BulletType.SEVENTH:
      return 4 / (Object.keys(BulletType).length + 1)
  }
}

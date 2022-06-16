import React from 'react'
import { Button } from 'antd'
import Styles from './wrapper.module.less'

const PositionDetailWrapper = () => {
  return (
    <div className={Styles.positionDetailWrapper}>
      <div className={Styles.detail}>
        <div className={Styles.title}>
          <div className={Styles.titleText}>PHP developer</div>
          <div>
            <Button type="primary">Apply For This Position</Button>
          </div>
        </div>
        <div className={Styles.description}>
          <p className={Styles.descriptionTitle}>Description</p>
          <p>This is description.</p>
        </div>
        <div className={Styles.responsibilities}>
          <p className={Styles.responsibilitiesTitle}>Resposibilities</p>
          <p>These are resposibilities</p>
        </div>
        <div className={Styles.qualifications}>
          <p className={Styles.qualificationsTitle}>Qualifications</p>
          <p>These are qualifications</p>
        </div>
      </div>
    </div>
  )
}

export default PositionDetailWrapper

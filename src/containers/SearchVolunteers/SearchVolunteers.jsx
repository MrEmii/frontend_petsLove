import React, { useCallback, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import Loading from 'components/commons/Loading'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import SearchVolunteersStore from 'stores/SearchVolunteersStore'
import styles from './searchVolunteers.scss'

const SearchVolunteers = () => {
  const { t } = useTranslation('searchVolunteers')
  const [stateAddress, setAddress] = useState({})
  const [loading, setSetLoadint] = useState(false)
  const searchVolunteersStore = useLocalStore(() => new SearchVolunteersStore())
  const handleChangeAddress = useCallback(address => {
    setAddress(address)
  }, [])

  const showPosition = position => {
    setAddress({ lat: position.coords.latitude, lng: position.coords.longitude })
  }

  useEffect(() => {
    setSetLoadint(true)

    setTimeout(() => {
      setSetLoadint(false)
    }, 500)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
  }, [])

  if (loading) {
    return <Loading loadingRing />
  }

  return (
    <div className={styles.containerTransit}>
      <LayoutContainer title={t('searchVolunteers')} information={t('information')}>
        <div className={styles.colbig}>
          <GoogleAutocomplete
            isEdit
            label={t('labelGoogle')}
            placeholder={t('placeholderGoogle')}
            handleChangeAddress={handleChangeAddress}
          />
          {stateAddress.lat && (
            <LayoutTrantitions>
              <GoogleMapsLocation
                location={stateAddress}
                users={searchVolunteersStore.volunteers}
              />
            </LayoutTrantitions>
          )}
        </div>
      </LayoutContainer>
    </div>
  )
}

export default observer(SearchVolunteers)

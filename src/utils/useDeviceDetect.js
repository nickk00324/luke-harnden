// this code is from https://reedbarger.com/how-to-create-a-custom-usedevicedetect-react-hook/
// thank you!!! <3

import React from "react"

export function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false)

  React.useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
    setMobile(mobile)
  }, [])

  return { isMobile }
}

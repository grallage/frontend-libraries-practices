type Props = {
  src: string
  srcSet?: string[] | string
  media?: string[] | string
  alt?: string
}
function Image(props: Props) {
  const { src, alt, srcSet, media, ...others } = props
  return (
    <picture>
      {media && srcSet && (
        <>
          {!Array.isArray(srcSet) && (
            <>
              <source
                srcSet={srcSet}
                media={media && !Array.isArray(media) ? media : undefined}
              />
            </>
          )}
          {Array.isArray(srcSet) && (
            <>
              {srcSet.map((item, index) => {
                return (
                  <>
                    <source
                      srcSet={item}
                      media={
                        media && Array.isArray(media) && media[index]
                          ? media[index]
                          : undefined
                      }
                    />
                  </>
                )
              })}
            </>
          )}
        </>
      )}
      {(typeof media === 'undefined' || typeof srcSet === 'undefined') && (
        <source srcSet={src} />
      )}
      <img src={src} alt={alt ?? ''} {...others} />
    </picture>
  )
}

export default Image

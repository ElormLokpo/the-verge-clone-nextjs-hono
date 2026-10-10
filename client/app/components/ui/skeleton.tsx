import ContentLoader from 'react-content-loader'

export const HeaderSectionSkeleton = () => {
    return (
        <div className="">
            <ContentLoader backgroundColor="#292524" foregroundColor="#57534d" viewBox="0 0 380 250">

                <rect x="0" y="0" rx="5" ry="5" width="100%" height="60%"  />
                <rect x="0" y="152" rx="5" ry="5" width="100%" height="4%" />
                <rect x="0" y="165" rx="5" ry="5" width="100%" height="4%" />
                <rect x="0" y="178" rx="5" ry="5" width="100%" height="4%" />
                <rect x="0" y="191" rx="5" ry="5" width="100%" height="4%" />

            </ContentLoader>
        </div>
    )

}
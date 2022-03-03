import React, { useState } from 'react'
import "./LoadMoreButton.scss"
import Loading from '../globals/loading/Loading'

interface LoadMoreButtonProps {
    total?: number
    result?: number
    handleLoadMore: () => any
    stopLoadMore: boolean
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ result, total, handleLoadMore, stopLoadMore }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loadMore = async () => {
        setIsLoading(true)
        await handleLoadMore()
        setIsLoading(false)
    }

    if (result && total && stopLoadMore) {
        if (result >= total || stopLoadMore) return <></>;
    }
    return (
        <div className="loadmore btn-primary" onClick={() => loadMore()}>
            {
                isLoading ? <Loading /> : <p>Xem thêm</p>
            }
        </div>
    )
}

export default LoadMoreButton
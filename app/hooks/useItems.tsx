import React, { useState, useEffect, useCallback } from 'react';
import { IDoc, IItem } from '@/app/types/types';

const INITIAL_ITEMS = 10;

const useItems = (items: IItem | null) => {
    const [originalItems, setOriginalItems] = useState<IDoc[]>([]);
    const [itemsToShow, setItemsToShow] = useState<IDoc[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasMore, setHasMore] = useState(false);
    const [lastShownItems, setLastShownItems] = useState<IDoc[]>([]);

    useEffect(() => {
        const { total = 0, docs = [] } = items || {};
        setOriginalItems(docs);
        const initialItems = docs.slice(0, INITIAL_ITEMS);
        setItemsToShow(initialItems);
        setLastShownItems(initialItems);
        setHasMore(total > INITIAL_ITEMS);
    }, [items]);

    const handleLoadMore = useCallback(() => {
        if (!hasMore) return;

        const nextItems = originalItems.slice(
            itemsToShow.length,
            itemsToShow.length + INITIAL_ITEMS
        );
        const updatedItemsToShow = [...itemsToShow, ...nextItems];
        setItemsToShow(updatedItemsToShow);
        setLastShownItems(updatedItemsToShow);
        setHasMore(originalItems.length > updatedItemsToShow.length);
    }, [itemsToShow, hasMore, originalItems]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === '') {
            setItemsToShow(lastShownItems);
            setHasMore(originalItems.length > lastShownItems.length);
        } else {
            const filteredItems = originalItems.filter((item) =>
                item.name.toLowerCase().includes(term)
            );
            setItemsToShow(filteredItems.slice(0, INITIAL_ITEMS));
            setHasMore(filteredItems.length > INITIAL_ITEMS);
        }
    }, [originalItems, lastShownItems]);

    return { itemsToShow, hasMore, handleLoadMore, searchTerm, handleSearchChange };
};

export default useItems;

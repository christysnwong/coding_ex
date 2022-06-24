const choice = (items) => {
    const randIdx = Math.floor(Math.random() * items.length);
    return items[randIdx];
}

const remove = (items, item) => {
    const idx = items.indexOf(item);

    if (idx !== -1) {
        return [...items.slice(0, idx), ...items.slice(idx + 1)];
    } else {
        return undefined;
    }
}

export {choice, remove};
const initialState = {
    records: [
        {
            id: 1,
            viewdate: '20 апреля',
            posterpath: 'xxxxxxxx',
            title: 'Снайпер',
            releaseYear: '2014',
            originalTitle: 'American Sniper',
            director: 'Клинт Иствуд',
            flag: 'us',
            rating: '6',
        },
        {
            id: 2,
            viewdate: '18 апреля',
            posterpath: 'xxxxxxxx',
            title: 'Рэмюо: Последняя кровь',
            releaseYear: '2019',
            originalTitle: 'Rambo: Last Blood',
            director: 'Адриан Грюнберг',
            flag: 'us',
            rating: '6',
        }
    ]
};

/**
 * Корневой редюсер.
 */
export const rootReducer = (state = initialState) => {
    /**
     * TODO: Здесь будет логика редюсера.
     */
    return state;
};

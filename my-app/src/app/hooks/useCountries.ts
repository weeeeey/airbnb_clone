import countries from "world-countries";

const formatedCountries = countries.map((c) => ({
    value: c.cca2, //국가 코드
    label: c.name.common, //국가 이름
    flag: c.flag, //국가 이미지url
    latlng: c.latlng, //국가 위도 경도
    region: c.region, // 국가 대륙
}));

const useCountries = () => {
    const getAll = () => formatedCountries;

    const getByValue = (value: string) => {
        return formatedCountries.find((item) => item.value === value);
    };
    return { getAll, getByValue };
};

export default useCountries;

// 위의 코드는 JavaScript 환경에서 사용되는 기능을 정의하는 모듈입니다. 이 코드는 "world-countries" 라이브러리를 사용하여 모든 나라의 정보를 포맷팅하고, 이를 가져오고 검색하는 두 가지 함수를 제공합니다.

// 1. `countries` 라이브러리 import:
//    ```
//    import countries from "world-countries";
//    ```

//    `world-countries` 라이브러리는 모든 국가에 대한 데이터를 제공하는 패키지입니다. 각 국가에 대한 여러 정보를 담은 배열로 구성되어 있습니다.

// 2. 데이터 포맷팅:
//    ```
//    const formatedCountries = countries.map((c) => ({
//        value: c.cca2,
//        label: c.name.common,
//        flag: c.flag,
//        latlng: c.latlng,
//        region: c.region,
//    }));
//    ```

//    `countries` 배열의 각 항목을 순회하면서, 각 국가에 대한 정보를 객체로 변환합니다. 새로운 객체의 프로퍼티는 다음과 같이 정의됩니다:

//    - `value`: 각 국가의 cca2 코드 (ISO 3166-1 alpha-2 코드, 두 자리 국가 코드).
//    - `label`: 각 국가의 공통 이름 (국가 이름).
//    - `flag`: 각 국가의 국기 이미지 URL.
//    - `latlng`: 각 국가의 위도와 경도를 담은 배열.
//    - `region`: 각 국가의 대륙 또는 지역 이름.

// 3. `useCountries` 함수:
//    ```
//    const useCountries = () => {
//        const getAll = () => formatedCountries;

//        const getByValue = (value: string) => {
//            return formatedCountries.find((item) => item.value === value);
//        };
//        return { getAll, getByValue };
//    };
//    ```

//    `useCountries` 함수는 두 개의 함수를 반환합니다:

//    - `getAll`: 모든 국가 정보를 포함하는 배열인 `formatedCountries`를 반환합니다.
//    - `getByValue`: 특정 국가 코드(`value`)를 인자로 받아 해당 국가 정보를 반환합니다. `formatedCountries` 배열에서 해당 국가 코드와 일치하는 객체를 찾아서 반환합니다.

// 이렇게 `useCountries` 모듈을 사용하면 어떤 국가 정보를 필요로 할 때, 위에서 포맷팅한 데이터를 편리하게 사용할 수 있습니다.

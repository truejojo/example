const useRandomCharacter = () => {
    const CAPITAL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    const SPECIAL_CHARACTERS = '!@#$%&€*()+[]{}=:<>?';
    
    const NUMBERS = '0123456789';
    const LETTERS = `${CAPITAL_LETTERS}${LOWERCASE_LETTERS}`;
    const CHARACTERS = `${NUMBERS}${LETTERS}${SPECIAL_CHARACTERS}`;

    const NUMBERS_LENGTH = NUMBERS.length;
    const LETTERS_LENGTH = LETTERS.length;
    const CHARACTERS_LENGTH = CHARACTERS.length;

    const getCharacter = (character, length) => character.charAt( Math.floor(Math.random() * length));

    const getNumbersIdent = ( length = 8 ) => Array.from({ length }, () => getCharacter(NUMBERS, NUMBERS_LENGTH)).join('');
   
    const getLettersIdent = (length = 8) => Array.from({ length }, () => getCharacter(LETTERS, LETTERS_LENGTH)).join('');
    
    const getCharactersIdent = (length = 8) => Array.from({ length }, () => getCharacter(CHARACTERS, CHARACTERS_LENGTH)).join('');

    return {
        getNumbersIdent,
        getLettersIdent,
        getCharactersIdent
    }
};

export default useRandomCharacter;
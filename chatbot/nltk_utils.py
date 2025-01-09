import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer

# Ensure the punkt tokenizer is available
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Initialize the Porter Stemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    """
    Split sentence into array of words/tokens.
    A token can be a word, punctuation character, or number.
    """
    return nltk.word_tokenize(sentence)

def stem(word):
    """
    Stemming: Find the root form of the word.
    Examples:
        words = ["organize", "organizes", "organizing"]
        words = [stem(w) for w in words]
        -> ["organ", "organ", "organ"]
    """
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, words):
    """
    Return a bag-of-words array:
    1 for each known word that exists in the sentence, 0 otherwise.
    Example:
        sentence = ["hello", "how", "are", "you"]
        words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
        bog   = [  0 ,    1 ,    0 ,   1 ,    0 ,    0 ,      0]
    """
    # Stem each word
    sentence_words = [stem(word) for word in tokenized_sentence]
    # Initialize bag with 0 for each word
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words:
            bag[idx] = 1

    return bag

# Test the module
if __name__ == "__main__":
    print("Testing tokenize function:")
    print(tokenize("Hello, how are you?"))  # Output: ['Hello', ',', 'how', 'are', 'you', '?']

    print("\nTesting stem function:")
    print(stem("organizing"))  # Output: 'organ'

    print("\nTesting bag_of_words function:")
    test_sentence = ["hello", "how", "are", "you"]
    known_words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
    print(bag_of_words(test_sentence, known_words))  # Example Output: [0. 1. 0. 1. 0. 0. 0.]

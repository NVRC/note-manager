#   note-manager

### Form input state flow
1. Define elements in `render()` via state vars
2. Capture form input using `onChange()`
3. Dispatch above to context bound event handlers
4. State is modified and a new render is prompted

        User -> View -> Handler -> State -> Render -
        ^                                          |
        |                                          |
        --------------------------------------------

### Syntactic parsing
- [x] Implement autocomplete suggestions while typing (handled in native keyboard)
- [ ] Notify user of any misspellings within text-box
- [ ] When in note entry mode provide definitions (AJAX API) via search bar

### Semantic parsing
- [ ] Decide on natural language processing (NLP) library to infer and derive meaning from plain text

Options:
* [Compromise](https://github.com/spencermountain/compromise)
* [Natural brain](https://github.com/mysamai/natural-brain)
* [Natural](https://github.com/NaturalNode/natural)
* [Sling](https://github.com/google/sling)
* [SEMPRE](https://github.com/stanfordnlp/sempre-plot)
* [spaCy](https://spacy.io/) Build a RESTful API wrapper

General process:
1. Tokenize input string
2. Stem each token (reduce to base syntax form)
3. Assign to each token a positive-negative ranking [-1..1]
4. Derive for each token a list of synonymes
5. Search within the `tag` set to associate `note` object together

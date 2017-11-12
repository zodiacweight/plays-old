# This beautifull website contains buch of wonderfull stories splited in 4 stories:

## Cabalistic Bewitching hero

## Joshua Universe

## Nihilistic parody

## Unbalanced*

---

*in the development stage yet

---

## Info

Another source is here: [https://github.com/zodiacweight/remake_of_plays](https://github.com/zodiacweight/remake_of_plays)

web-site: [english-comics.github.io](english-comics.github.io)

emails:

[srgg.next@gmail.com](srgg.next@gmail.com)

[educationservice.ru@gmail.com](educationservice.ru@gmail.com)

## Technical details

* Use command <code>|> node build.js |</code> to build content

* Copy compiled files to the root of project <code>english-comics</code>

## Notes about the site contents structure

* In order to exclude a particular story from stories list on the landing page, move a target <code>*.json file</code> from directory <code>static/jsons/default</code> to <code>static/jsons_postponed</code>. 

The folders structure in <code>static/jsons/texts</code> should coincide to the file set in <code>static/jsons/default</code>.

## JSONs mandatory structure

### For story's landing page

* header

* url

* preview

* about_characters

* chapters

Currently chapter names should contain numbers to diffirentiate their names in files names.

#### The example:

```js
{
    "header":"Joshua's Universe",
    "url": "joshua_world",
    "preview": "There is the story of one guy, Joshua by name, a young scientist, who adored Universe and all the stuff like this. He wanted to go to other worlds. And actually, he did.",
    "about_characters": [
      "Let me check...",
      "...a new paragraph... ?"
    ],
    "chapters": {
      "1":"Joshua Ancient World",
      "2":"Joshua gonna Europa"
    }
}
```

### For texts

* number

* header

* replics

#### For example:

```js
[
  {
    "number": 1,
    "header": "In the Stevenson's family",
    "replics": [
        {
        "Author's words": [
          "Now Nick Stevenson is sitting in his invalid armchair and listening the radio. He has been sitting so for a long time, but suddenly he listened that Sophie has come. Sophie entered in the room."
        ]
      },
      {
        ...
      },
      ...
    ]
  }
]
```

## UI plugins

Vertical scrollbar, seems to be a best choice, if needed: 

[http://diokuz.github.io/baron/](http://diokuz.github.io/baron/), [https://github.com/Diokuz/baron](https://github.com/Diokuz/baron)

---

## ToDo

1. Parse paragraphs

2. Handle images

3. Remove redundant fields from JSONs

4. Create buider for texts

5. Clean up & document out build.js


import React, {useState} from 'react'
import globeIconUrl from '../../icons/148705-essential-collection/svg/worldwide.svg'
import CountrySelect from '../util/country-select.component'
import {StepComponentProps, Step} from './add-client.component'

export default function GlobalBackground(props: StepComponentProps) {
  const [countryOfOrigin, setCountryOfOrigin] = useState('US')
  const [numYearsInUSA, setNumYearsInUSA] = useState(1)
  const [primaryLanguage, setPrimaryLanguage] = useState('Spanish')
  const [otherLanguage, setOtherLanguage] = useState('')
  const [englishLevel, setEnglishLevel] = useState(EnglishLevel.INTERMEDIATE)
  const [registeredToVote, setRegisteredToVote] = useState(false)

  return (
    <>
      <div className="hints-and-instructions">
        <div>
          <img src={globeIconUrl} className="hint-icon" />
        </div>
        <div className="instruction">
          Tell us about their country of origin and language skills.
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>
              Country of origin
            </span>
            <CountrySelect
              country={countryOfOrigin}
              setCountry={setCountryOfOrigin}
              autoFocus
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Years in U.S.A.
            </span>
            <input required type="number" value={numYearsInUSA} onChange={evt => setNumYearsInUSA(Number(evt.target.value))} />
          </label>
        </div>
        <div>
          <label>
            <span>
              Registered to vote?
            </span>
            <input type="checkbox" name="registeredToVote" checked={registeredToVote} onChange={evt => setRegisteredToVote(Boolean(evt.target.checked))} />
          </label>
        </div>
        <div>
          <label>
            <span>
              Primary language at home
            </span>
            <select required name="primaryLanguage" value={primaryLanguage} onChange={evt => setPrimaryLanguage(evt.target.value)}>
              <option value="spanish">
                Spanish
              </option>
              <option value="english">
                English
              </option>
              <option value="bothSpanishAndEnglish">
                Both
              </option>
              <option value="other">
                Other
              </option>
            </select>
          </label>
        </div>
        {primaryLanguage === 'other' &&
          <div>
            <label>
              <span>
                Other language
              </span>
              <input required type="text" value={otherLanguage} onChange={evt => setOtherLanguage(evt.target.value)} />
            </label>
          </div>
        }
        <div>
          <label>
            <span>
              English level
            </span>
            <select required value={englishLevel} onChange={evt => setEnglishLevel(evt.target.value)}>
              <option value="beginner">
                Beginner
              </option>
              <option value="intermediate">
                Intermediate
              </option>
              <option value="advanced">
                Advanced
              </option>
            </select>
          </label>
        </div>
        <div className="actions">
          <button type="submit" className="primary">
            Next step
          </button>
          <button type="button" className="secondary" onClick={() => props.goBack(Step.PERSONAL_INFORMATION)}>
            Go back
          </button>
        </div>
      </form>
    </>
  )

  function handleSubmit(evt) {
    evt.preventDefault()
    props.nextStep(Step.INCOME_INFORMATION, {
      countryOfOrigin,
      numYearsInUSA,
      primaryLanguage: primaryLanguage === 'other' ? otherLanguage : primaryLanguage,
      englishLevel,
      registeredToVote,
    })
  }
}

export enum EnglishLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}
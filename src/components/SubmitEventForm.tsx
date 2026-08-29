'use client';

import { useId, useState } from 'react';
import { buttonClass } from './ui';
import { eventTypes, regions } from '@/data/taxonomy';
import { siteConfig } from '@/config/site';

/**
 * Event submission without a backend.
 *
 * There is no database in the MVP, so rather than fake a save this form
 * composes a well-structured email and opens the visitor's mail client. The
 * copy says exactly that. When a backend or form provider is added, swap
 * `buildMailto` for a POST and keep the same fields.
 */

const fields = [
  { name: 'name', label: 'Event name', required: true, type: 'text' },
  { name: 'date', label: 'Date', required: true, type: 'date' },
  { name: 'location', label: 'Location (town or start point)', required: true, type: 'text' },
  { name: 'distance', label: 'Distance(s)', required: true, type: 'text' },
  { name: 'elevation', label: 'Total ascent, if known', required: false, type: 'text' },
  { name: 'organiser', label: 'Organiser', required: true, type: 'text' },
  { name: 'url', label: 'Entry or info page (URL)', required: true, type: 'url' },
  { name: 'contact', label: 'Your email, so we can confirm', required: true, type: 'email' },
] as const;

type FieldName = (typeof fields)[number]['name'] | 'region' | 'type' | 'notes';

const initialState: Record<FieldName, string> = {
  name: '',
  date: '',
  location: '',
  distance: '',
  elevation: '',
  organiser: '',
  url: '',
  contact: '',
  region: regions[0],
  type: eventTypes[0],
  notes: '',
};

function buildMailto(values: Record<FieldName, string>) {
  const subject = `Event submission: ${values.name || 'untitled event'}`;
  const lines = [
    `Event name: ${values.name}`,
    `Date: ${values.date}`,
    `Location: ${values.location}`,
    `Region: ${values.region}`,
    `Event type: ${values.type}`,
    `Distance(s): ${values.distance}`,
    `Total ascent: ${values.elevation || 'not known'}`,
    `Organiser: ${values.organiser}`,
    `Entry / info URL: ${values.url}`,
    `Contact email: ${values.contact}`,
    '',
    'Anything else we should know:',
    values.notes || '(nothing added)',
  ];

  return `mailto:${siteConfig.email.events}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function SubmitEventForm() {
  const formId = useId();
  const [values, setValues] = useState(initialState);
  const [opened, setOpened] = useState(false);

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = buildMailto(values);
    setOpened(true);
  }

  const inputClass =
    'mt-2 w-full border border-line bg-ink px-4 py-3 text-base text-paper outline-none placeholder:text-mute/60 hover:border-mute';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.name === 'name' ? 'sm:col-span-2' : ''}
          >
            <label
              htmlFor={`${formId}-${field.name}`}
              className="label block text-mute"
            >
              {field.label}
              {field.required ? (
                <span className="text-red"> *</span>
              ) : (
                <span className="text-mute"> (optional)</span>
              )}
            </label>
            <input
              id={`${formId}-${field.name}`}
              name={field.name}
              type={field.type}
              required={field.required}
              value={values[field.name]}
              onChange={(event) => update(field.name, event.target.value)}
              className={inputClass}
            />
          </div>
        ))}

        <div>
          <label htmlFor={`${formId}-region`} className="label block text-mute">
            Region <span className="text-red">*</span>
          </label>
          <select
            id={`${formId}-region`}
            value={values.region}
            onChange={(event) => update('region', event.target.value)}
            className={`${inputClass} appearance-none`}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-type`} className="label block text-mute">
            Event type <span className="text-red">*</span>
          </label>
          <select
            id={`${formId}-type`}
            value={values.type}
            onChange={(event) => update('type', event.target.value)}
            className={`${inputClass} appearance-none`}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-notes`} className="label block text-mute">
            Anything else <span className="text-mute">(optional)</span>
          </label>
          <textarea
            id={`${formId}-notes`}
            rows={4}
            value={values.notes}
            onChange={(event) => update('notes', event.target.value)}
            placeholder="Cut-offs, terrain, whether it is beginner-friendly, anything that helps us describe it honestly."
            className={inputClass}
          />
        </div>
      </div>

      <button type="submit" className={`${buttonClass('primary', 'lg')} w-full sm:w-auto`}>
        Open this in my email app
      </button>

      <p role="status" aria-live="polite" className="text-sm text-mute">
        {opened
          ? 'Your email app should have opened with the details filled in. Nothing has been sent or stored by this website — press send in your email app to reach us.'
          : ''}
      </p>
    </form>
  );
}

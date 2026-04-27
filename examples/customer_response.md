# Customer Response — Support Ticket #NK-9284

Hello Priya,

Thank you for reaching out, and I'm sorry for the disruption this has caused your HR team and onboarding pipeline. I've identified the root cause and it's a straightforward fix.

The issue is in how the `claims` parameter is formatted when creating a verification request. Your integration is sending claims as a plain array (`["name", "birth_date", "address"]`), but the API expects an OIDC claims object. When it receives an array, it does a best-effort parse that only recognizes the first element and silently drops the rest, and no error is returned. That's why `name` almost always comes through (it's first in the array) while `birth_date` and `address` are missing.

The API accepts this format without returning an error, which makes this easy to miss. The fix is to change the claims format to an OIDC claims object. Here's what needs to change:

Update the interface:

```typescript
interface CreateRequestPayload {
  env: string;
  claims: {
    id_token: Record<string, null>;
  };
  label: string;
  max_usages: number;
  expires_at?: string;
}
```

And update the payload in your verification request:

```typescript
const payload: CreateRequestPayload = {
  env: config.nametagEnvId,
  claims: {
    id_token: {
      name: null,
      birth_date: null,
      address: null,
    },
  },
  label: employeeLabel,
  max_usages: 0,
  expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
};
```

Since formatting can be lost in email, I've attached a modified copy of the integration code with these changes applied. Once deployed, all three fields should come through consistently. Please let me know if you run into any issues or have questions.

Thanks,

Rachel

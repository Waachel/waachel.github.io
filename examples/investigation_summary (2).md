# Internal Investigation Summary — Support Ticket #NK-9284

1. Reviewed the README, Support Ticket, and Application logs to understand the reported issue: name was returning successfully but birth_date and address were consistently missing from Workday records.

2. Compared the code against the API documentation. Verified that `birth_date` and `address` are the correct claim names, and confirmed the URL structure and auth method matched the docs.

3. Created a working copy of the customer's integration code and added `console.log(JSON.stringify(response.data, null, 2))` after the properties fetch to inspect the raw API response.

4. The logged response showed that `name` returned with status 200, but `birth_date` and `address` returned with status 403. Per the API docs, 403 means the data has not been shared or access was revoked. This was unexpected since the user had completed verification and shared all three claims.

5. Reviewed `mock_nametag_api.go` to understand how the API parses the claims parameter. Found the key comment in the `parseClaims` function: when claims are sent as a plain array instead of an OIDC claims object, the API only recognizes the first element and silently drops the rest.

6. Updated the integration code to send claims in the correct OIDC format (`{"id_token": {"name": null, "birth_date": null, "address": null}}`) instead of a plain array. Also updated the `CreateRequestPayload` interface to match.

7. Reran the reproducer environment and confirmed all three claims now return with status 200 and populated values for each user.

8. Removed the diagnostic console.log line as it was only needed for troubleshooting.

**Root Cause:** The integration code defined claims as a `string[]` (plain JSON array). The Nametag API expects claims in OIDC format. When the API receives an array, it only parses the first element and silently drops the rest, causing `birth_date` and `address` to never be registered in the verification request.

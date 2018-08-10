package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/apex/gateway"
)

// ContentType is the Content-Type header set in responses.
const ContentType = "application/json; charset=utf8"

// Form stucture for the form handler
type Form struct {
	Name        []string `json:"name"`
	Email       []string `json:"email"`
	Phone       []string `json:"phone"`
	CompanyName []string `json:"companyName"`
	Message     []string `json:"message"`
}

// FormHandler is a http.HandlerFunc for the / path.
func FormHandler(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()
	fmt.Println(r.Form) // print information on server side.
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	resp := Form{
		Name:        r.Form["name"],
		Email:       r.Form["email"],
		Phone:       r.Form["phone"],
		CompanyName: r.Form["companyName"],
		Message:     r.Form["message"],
	}
	json.NewEncoder(w).Encode(resp)
}

// h wraps a http.HandlerFunc and adds common headers.
func h(next http.HandlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", ContentType)
		next.ServeHTTP(w, r)
	})
}

func main() {
	http.Handle("/", h(FormHandler))
	log.Fatal(gateway.ListenAndServe(":9000", nil))
}

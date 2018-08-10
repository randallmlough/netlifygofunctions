package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/apex/gateway"
)

type Env struct {
	Env  string `json:"ENV_KEY"`
	Name string `json:"NAME"`
}

// EnvHandler is a http.HandlerFunc for the / path.
func EnvHandler(w http.ResponseWriter, r *http.Request) {
	// env enivroment variable is set in the template.tml global file and should output "SOMELOCALKEY" Locally and some "SOMESECRETKEY" deployed
	env, _ := os.LookupEnv("ENV_KEY")
	name, _ := os.LookupEnv("NAME")
	fmt.Println(env)
	fmt.Println(name)
	resp := Env{
		Env:  env,
		Name: name,
	}
	json.NewEncoder(w).Encode(resp)
}

// h wraps a http.HandlerFunc and adds common headers.
func h(next http.HandlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf8")
		next.ServeHTTP(w, r)
	})
}

func main() {
	http.Handle("/", h(EnvHandler))
	log.Fatal(gateway.ListenAndServe(":9000", nil))
}
